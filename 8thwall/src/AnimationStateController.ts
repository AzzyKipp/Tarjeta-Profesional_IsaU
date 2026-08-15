import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'AnimationStateController',

  stateMachine: ({world, eid}) => {
    const idle = ecs.defineState('idle')
      .initial()
      .onEnter(() => {
        ecs.GltfModel.mutate(world, eid, (cursor) => {
          cursor.animationClip = 'Idle'
          cursor.loop = true
          cursor.repetitions = -1
          return false
        })
      })
      .onEvent(ecs.input.SCREEN_TOUCH_START, 'dance', {
        target: eid,
      })

    const dance = ecs.defineState('dance')
      .onEnter(() => {
        ecs.GltfModel.mutate(world, eid, (cursor) => {
          cursor.animationClip = 'Dance'
          cursor.loop = false
          cursor.repetitions = 0
          return false
        })
      })
  },
})