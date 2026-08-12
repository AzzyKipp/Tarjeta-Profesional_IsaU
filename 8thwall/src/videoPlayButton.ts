import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'VideoButtonController',

  schema: {
    videoEntity: ecs.eid,
    playButton: ecs.eid,
    pauseButton: ecs.eid,
  },

  schemaDefaults: {
    
  },

  stateMachine: ({world, eid, schemaAttribute}) => {

    ecs.defineState('default')
      .initial()

      .onEnter(() => {
        const {videoEntity, playButton, pauseButton} =
          schemaAttribute.get(eid)

        // Al comenzar:
        // mostramos Play
        ecs.Hidden.remove(world, playButton)

        // y ocultamos Pause
        ecs.Hidden.set(world, pauseButton)
      })

      // PLAY
      .listen(
        schemaAttribute.get(eid).playButton,
        ecs.input.UI_CLICK,
        () => {

          const {videoEntity, playButton, pauseButton} =
            schemaAttribute.get(eid)

          ecs.VideoControls.mutate(
            world,
            videoEntity,
            (video) => {
              video.paused = false
              return false
            }
          )

          // Ocultar Play
          ecs.Hidden.set(world, playButton)

          // Mostrar Pause
          ecs.Hidden.remove(world, pauseButton)
        }
      )

      // PAUSE
      .listen(
        schemaAttribute.get(eid).pauseButton,
        ecs.input.UI_CLICK,
        () => {

          const {videoEntity, playButton, pauseButton} =
            schemaAttribute.get(eid)

          ecs.VideoControls.mutate(
            world,
            videoEntity,
            (video) => {
              video.paused = true
              return false
            }
          )

          // Mostrar Play
          ecs.Hidden.remove(world, playButton)

          // Ocultar Pause
          ecs.Hidden.set(world, pauseButton)
        }
      )
  },
})