import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'PokedexVideoController',

  // =========================
  // CONFIGURACIÓN DEL COMPONENTE
  // =========================

  schema: {
    video: ecs.string,
  },

  schemaDefaults: {
    video: './assets/hellyeah.mp4',
  },

  // =========================
  // CARGAR POKÉDEX
  // =========================

  add: (world, component) => {
    console.log('🚀 PokedexVideoController iniciado')

    const videoControls = ecs.VideoControls.get(world, component.eid)

    console.log('🎮 VideoControls:', videoControls)

    ecs.VideoControls.set(world, component.eid, {
      paused: true,
    })

    // =========================
    // CARGAR POKÉDEX
    // =========================

    ecs.GltfModel.set(world, component.eid, {
      url: './assets/pokedex.glb',
    })

    // =========================
    // ESPERAR A QUE CARGUE EL GLB
    // =========================

    world.events.addListener(
      component.eid,
      ecs.events.GLTF_MODEL_LOADED,
      (event: any) => {
        console.log('🎯 POKÉDEX CARGADA')

        const object3D = event.data.model

        object3D?.traverse((child: any) => {
          if (!child.isMesh) return
          if (child.material?.name !== 'Screen') return

          console.log('🖥️ ENCONTRAMOS SCREEN')

          const material = child.material

          // =========================
          // COLOR DEL MATERIAL
          // =========================

          material.color.set(0xffffff)
          material.needsUpdate = true

          // =========================
          // UV DE SCREEN
          // =========================

          const uv = child.geometry.attributes.uv

          if (uv) {
            for (let i = 0; i < uv.count; i++) {
              const u = uv.getX(i)
              const v = uv.getY(i)

              const newU =
                (u - 0.1342474371) /
                (0.1637316048 - 0.1342474371)

              const newV =
                (v - 0.9472728968) /
                (0.9855647087 - 0.9472728968)

              uv.setXY(i, newU, newV)
            }

            uv.needsUpdate = true
          }

          // =========================
          // VIDEO TEXTURE
          // =========================

          const videoTexture = material.map

          if (videoTexture) {
            videoTexture.center.set(0.5, 0.5)
            videoTexture.rotation = -Math.PI / 2
            videoTexture.needsUpdate = true
          }

          // =========================
          // VIDEO DEL MATERIAL
          // =========================

          const video = videoTexture?.source?.data

          if (!video) {
            console.error(
              '❌ No se encontró un video seleccionado en el material Screen'
            )
            return
          }

          console.log('🎬 VIDEO ENCONTRADO')

          // =========================
          // PRUEBA DE FUENTE DEL VIDEO
          // =========================

          video.src = './assets/hellyeah.mp4'
          video.load()

          console.log('🎥 NUEVA FUENTE:', video.src)


          console.log(
            '🎥 VIDEO SRC:',
            video.currentSrc
          )

          console.log(
            '🎥 VIDEO READY STATE:',
            video.readyState
          )

          console.log(
            '🎥 VIDEO NETWORK STATE:',
            video.networkState
          )

          // =========================
          // EVENTOS DEL VIDEO
          // =========================

          video.addEventListener('loadeddata', () => {
            console.log('🎬 HTML VIDEO LOADEDDATA')
          })

          video.addEventListener('canplaythrough', () => {
            console.log('🎬 HTML VIDEO CANPLAYTHROUGH')
          })
        })
      }
    )
  },

  // =========================
  // LEER VIDEO DEL INSPECTOR
  // =========================

  stateMachine: ({world, eid, schemaAttribute}) => {
    ecs.defineState('default')
      .initial()
      .onEnter(() => {
        const data = schemaAttribute.get(eid)

        console.log(
          '🎥 VIDEO DEL INSPECTOR:',
          data.video
        )
      })
  },
})