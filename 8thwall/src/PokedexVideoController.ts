import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'PokedexVideoController',

  schema: {
    video: ecs.string,
  },

  add: (world, component) => {
    console.log('🚨 PokedexVideoController está corriendo')
    const videoControls = ecs.VideoControls.get(world, component.eid)

    console.log('🎬 VIDEO CONTROLS:', videoControls)

    const {THREE} = window as any

    ecs.GltfModel.set(world, component.eid, {
      url: './assets/pokedex.glb',
    })

    console.log('📦 GltfModel configurado')

    const object3D = world.three.entityToObject.get(component.eid)

    setTimeout(() => {
      console.log('⏱️ Buscando Screen...')

      object3D?.traverse((child: any) => {
        if (!child.isMesh) return

        if (child.material?.name !== 'Screen') return

        console.log('🎯 ENCONTRAMOS SCREEN')

        const material = child.material

        // =========================
        // UV
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

          console.log('🎨 UV DE SCREEN REMAPEADAS')
        }

        // =========================
        // VIDEO
        // =========================

        const video = document.createElement('video')

        const videoPath = './assets/video_olas.mp4'

        console.log('🎥 VIDEO SELECCIONADO:', videoPath)

        video.src = videoPath
        
        video.loop = true
        video.muted = true
        video.playsInline = true
        video.setAttribute('playsinline', '')

        video.addEventListener('loadeddata', () => {
          console.log('🎬 VIDEO CARGÓ LOS DATOS')

          console.log(
            '📐 DIMENSIONES VIDEO:',
            video.videoWidth,
            'x',
            video.videoHeight
          )

          console.log(
            '📐 PROPORCIÓN VIDEO:',
            video.videoWidth / video.videoHeight
          )
        })

        video.addEventListener('playing', () => {
          console.log('▶️ VIDEO ESTÁ REPRODUCIÉNDOSE')
        })

        video.addEventListener('error', (error) => {
          console.error('❌ ERROR DEL VIDEO:', error)
        })

        const videoTexture = new THREE.VideoTexture(video)

        videoTexture.colorSpace = THREE.SRGBColorSpace

        material.map = videoTexture
        material.color.set(0xffffff)
        material.needsUpdate = true

        console.log('🌊 VIDEO TEXTURE ASIGNADA A SCREEN')

        video.play().catch((error: any) => {
          console.error('❌ No se pudo reproducir el video:', error)
        })
      })
    }, 2000)
  },
})