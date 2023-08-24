import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/formsControls/FormControls";
import {requiredField} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import {AppRootStateType} from "../../redux/store";
import s from './../common/formsControls/FormControls.module.css'

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

type PropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
    isAuth: boolean
}

const Login = (props: PropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>

    }
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )

}

export const LoginForm = (props: InjectedFormProps<FormDataType>) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder="Email" name={'email'} component={Input} validate={[requiredField]}/>
            </div>
            <div>
                <Field placeholder="Password" name={'password'} type={'password'} component={Input}
                       validate={[requiredField]}/>
            </div>
            <div>
                <Field type="checkbox" name={'rememberMe'} component={Input}/> remember me
            </div>
            {props.error && <div className={s.formSummaryError}> {props.error} </div>}
            <div>
                <button>login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)


type MapStateToPropsType = {
    isAuth: boolean
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth
    }

}

export default connect(mapStateToProps, {login})(Login)