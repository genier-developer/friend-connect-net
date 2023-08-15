import React from "react";
import {addNewMessageAC, ChangeNewMessageAC, DialogsType, MessagesType} from "../../redux/dialogsReducer";
import {Dialogs} from "./Dialogs";
import {AppRootStateType} from "../../redux/store";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";


export type DialogsPageType = {
    dialogs: Array<DialogsType>,
    messages: Array<MessagesType>,
    newMessageText: string
}

type MapStateToPropsType = {
    dialogsPage: DialogsPageType
}

type MapDispatchToPropsType = {
    updateNewMessageBody: (body: string) => void,
    addNewMessage: (text: string) => void,
}

let mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        updateNewMessageBody: (body: string) => {
            dispatch(ChangeNewMessageAC(body))
        },
        addNewMessage: (text: string) => {
            dispatch(addNewMessageAC(text))
        }
    }
}

export default WithAuthRedirect (connect(mapStateToProps, mapDispatchToProps)(Dialogs))