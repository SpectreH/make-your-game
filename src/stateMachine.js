// Structure of state machine
export class StateMachine {
  constructor(states) {
    this.empty = {
      render: function () { },
      update: function () { },
      enter: function (params) { },
      exit: function () { }
    }
    this.states = states || {}
    this.current = this.empty
  }

  change(stateName, enterParams) {
    if (this.current.exit) {
      this.current.exit()
    }
    this.current = this.states[stateName]
    this.current.enter(enterParams)
  }

  update(dt) {
    if (this.current.update) {
      this.current.update(dt)
    }
  }

  render() {
    if (this.current.render) {
      this.current.render()
    }
  }
}