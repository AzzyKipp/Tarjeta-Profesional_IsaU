import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'PlayPauseButtonController',

  schema: {
    button: ecs.eid,
    videoController: ecs.eid,
    icon: ecs.eid,
  },

  stateMachine: ({world, eid, schemaAttribute}) => {
    ecs.defineState('default')
      .initial()
      .listen(
        schemaAttribute.get(eid).button,
        ecs.input.UI_CLICK,
        () => {
          console.log('🔥 CLICK DEL BOTÓN DETECTADO')

          const data = schemaAttribute.get(eid)

          const controls = ecs.VideoControls.get(
            world,
            data.videoController
          )

          ecs.VideoControls.mutate(
            world,
            data.videoController,
            (cursor) => {
              cursor.paused = !cursor.paused
              return false
            }
          )

          const paused = ecs.VideoControls.get(
            world,
            data.videoController
          ).paused

          console.log('🎮 PAUSED:', paused)

          ecs.Ui.mutate(world, data.icon, (cursor) => {
            cursor.image = paused
              ? 'assets/play.png'
              : 'assets/pause.png'

            return false
          })

          console.log(
            '🖼️ ICONO:',
            ecs.Ui.get(world, data.icon).image
          )
        }
      )
  },
})