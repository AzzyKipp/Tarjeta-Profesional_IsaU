import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'InputTest',

  stateMachine: ({world}) => {
    ecs.defineState('default')
      .initial()
      .onEnter(() => {
        console.log('🟢 INPUT TEST INICIADO')
      })
      .listen(
        world.events.globalId,
        ecs.input.SCREEN_TOUCH_MOVE,
        () => {
          console.log('👆 MOVIMIENTO DE PANTALLA DETECTADO')
        }
      )
  },
})