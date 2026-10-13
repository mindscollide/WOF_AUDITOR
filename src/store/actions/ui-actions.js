import * as actions from "../action_types";

const enableGoBack = () => {
  return {
    type: actions.UI_GO_BACK_ENABLE,
  };
};

const disableGoBack = () => {
  return {
    type: actions.UI_GO_BACK_DISABLE,
  };
};

const activeEdit = () => {
  return {
    type: actions.ACTIVE_EDIT,
  };
};
const SomeThingWentWrong = (response) => {
  console.log("error",response)
  return{
    type: actions.SOMETHINGWENTWRONG,
  }
}
const SomeThingWentWrongRemove = (response) => {
  console.log("error",response)
  return{
    type: actions.SOMETHINGWENTWRONGREMOVE,
  }
}
export { enableGoBack, disableGoBack, activeEdit , SomeThingWentWrong , SomeThingWentWrongRemove };
