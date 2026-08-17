import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'PokedexVideoController',

  // =========================
  // CONFIGURACIÓN
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

    // Video comienza pausado
    ecs.VideoControls.set(world, component.eid, {
      paused: true,
    })

    // Cargar modelo
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
        const object3D = event.data.model

        object3D?.traverse((child: any) => {
          if (!child.isMesh) return
          if (child.material?.name !== 'Screen') return

          const material = child.material

          // =========================
          // MATERIAL
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

          if (!videoTexture) {
            console.error('❌ No existe VideoTexture en Screen')
            return
          }

          videoTexture.offset.set(0, 0)
          videoTexture.repeat.set(1, 1)
          videoTexture.center.set(0.5, 0.5)

          videoTexture.rotation = -Math.PI / 2
          videoTexture.flipY = true

          videoTexture.needsUpdate = true

          // =========================
          // VIDEO
          // =========================

          const video = videoTexture.source?.data

          if (!video) {
            console.error('❌ No se encontró el elemento HTMLVideo')
            return
          }

          // =========================
          // FUENTE DEL VIDEO
          // =========================

          video.src = './assets/hellyeah.mp4'
          video.load()
        })
      }
    )
  },

  // =========================
  // VIDEO DEL INSPECTOR
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