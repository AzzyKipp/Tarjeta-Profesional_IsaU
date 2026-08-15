import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'PokedexVideoController',

  schema: {},

  add: (world, component) => {
    const {THREE} = window as any

    const object3D = world.three.entityToObject.get(component.eid)

    if (!object3D) {
      console.error('No se encontró el objeto 3D del Pokédex')
      return
    }

    // Crear el elemento de video
    const video = document.createElement('video')

    video.src = 'assets/video_olas.mp4'
    video.loop = true
    video.muted = true
    video.playsInline = true
    video.setAttribute('playsinline', '')

    // Crear la textura de video
    const videoTexture = new THREE.VideoTexture(video)

    videoTexture.colorSpace = THREE.SRGBColorSpace

    // Buscar específicamente el material "Screen"
    object3D.traverse((child: any) => {
      if (!child.isMesh) return

      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material]

    world.events.addListener(component.eid, ecs.events.GLTF_MODEL_LOADED, (event: any) => {
      console.log('MODELO GLTF:', event.data.model)
      const model = event.data.model

    model.traverse((child: any) => {
      if (!child.isMesh) return

      const material = child.material

      if (material.name === 'Screen') {
        console.log('🎯 ENCONTRAMOS SCREEN')

        const video = document.createElement('video')

        video.src = 'assets/video_olas.mp4'
        video.loop = true
        video.muted = true
        video.playsInline = true
        video.setAttribute('playsinline', '')

        video.load()

        video.addEventListener('loadeddata', () => {
        console.log('🎬 VIDEO CARGÓ LOS DATOS')
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

        video.play().catch((error: any) => {
          console.error('No se pudo reproducir el video:', error)
        })
  }
})
  })
    })

    // Intentar reproducir el video
    video.play().catch((error: any) => {
      console.error('No se pudo reproducir el video:', error)
    })
  },
})