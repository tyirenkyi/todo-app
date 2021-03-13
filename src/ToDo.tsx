interface ToDo {
  id: string,
  text: string,
  complete: boolean
}

class ToDoClass implements ToDo {
  constructor(public id: string, public text: string, public complete: boolean) {

  }
}

export default ToDo;
export { ToDoClass };