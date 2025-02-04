

import { showNotification } from "../../bootstrap-widgets/Notification/notificationService";

export const errorNotification = (message: string, title = "Error") => {
    showNotification({
      title: title,
      message: message,
      icon: <Icon name='cross' />,
      color: "white",
      autoClose: 5000,
    });
  };
  
  export const successNotification = (message: string, title = "Success") => {
    showNotification({
      title: title,
      message: message,
      icon: <Icon name='check' />,
      color: "white",
      autoClose: 5000,
    });
  };


export const handelReponseCode = (
    callBack: ((success: boolean, message?: string) => void) | undefined,
    info: {
      code: number;
      message: string;
    },
    hideErrorNotification = false,
  ) => {
    if (info.code === 100) {
      callBack && callBack(true, info.message);
      // successNotification(info.message)
    } else if (info.message) {
      callBack && callBack(false);
      !hideErrorNotification && errorNotification(info.message);
    }
    return {
      isError: info.code !== 100,
      message: info.message,
      code: info.code,
    };
  };