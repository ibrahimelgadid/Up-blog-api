import axios from "axios";
import {
  ADD_TASK,
  CLEAR_ERRORS,
  EDIT_TASK,
  GET_ERRORS,
  GET_TASK,
  GET_TASKS,
} from "./actionsTypes";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

//---------------------------------------------|
//           GET TASKS
//---------------------------------------------|
export const getTasksFun = (search, page) => (dispatch) => {
  axios
    .get("/todo/task?search=" + search + "&page=" + page)
    .then((res) => {
      dispatch({
        type: GET_TASKS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//---------------------------------------------|
//           POST NEW TASK
//---------------------------------------------|
export const addTaskFun = (taskData, navigate) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post("todo/task", taskData)
    .then((res) => {
      dispatch({
        type: ADD_TASK,
        payload: res.data,
      });
      toast.success("new task added successufully");
      navigate("/tasks");
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//---------------------------------------------|
//           POST NEW TASK
//---------------------------------------------|
export const editTaskFun = (taskData, taskId, navigate) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .put("/todo/task/" + taskId, taskData)
    .then((res) => {
      dispatch({
        type: EDIT_TASK,
        payload: res.data,
      });
      navigate("/tasks");
      toast.success("Task edited successufully");
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//---------------------------------------------|
//           GET TASK BY ID
//---------------------------------------------|
export const getTaskFun = (id) => (dispatch) => {
  axios
    .get("/todo/task/" + id)
    .then((res) => {
      dispatch({
        type: GET_TASK,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
//---------------------------------------------|
//           DELETE TASK
//---------------------------------------------|
export const deleteTaskFun = (id, s, p) => (dispatch) => {
  axios
    .delete("todo/task/" + id)
    .then((res) => {
      toast.success("Task deleted successufully");
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
