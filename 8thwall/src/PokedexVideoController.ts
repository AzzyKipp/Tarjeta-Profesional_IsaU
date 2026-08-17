import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'PokedexVideoController',

  schema: {},

add: (world, component) => {
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

    const object3D = world.three.entityToObject.get(component.eid)

    // Esperar a que el GLB termine de cargar
    setTimeout(() => {
      object3D?.traverse((child: any) => {
        if (!child.isMesh) return
        if (child.material?.name !== 'Screen') return

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
        // VIDEO DEL INSPECTOR
        // =========================

        const videoTexture = material.map
              if (videoTexture) {
        videoTexture.center.set(0.5, 0.5)
        videoTexture.rotation = -Math.PI / 2
        videoTexture.needsUpdate = true
      }
        const video = videoTexture?.source?.data
        const videoControls = ecs.VideoControls.get(world, component.eid)
        
        if (!video) {
          console.error(
            '❌ No se encontró un video seleccionado en el material Screen'
          )
          return
        }

        // Reproducir el video seleccionado desde el Inspector
      })
    }, 2000)
  },
})