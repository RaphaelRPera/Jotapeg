import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { CreateImage } from '../pages/CreateImage/CreateImage'
import { Feed } from '../pages/Feed/Fedd'
import { Login } from '../pages/Login/Login'
import { SignUp } from '../pages/SignUp/SignUp'
import { MyImages } from '../pages/MyImages/MyImages'
import { Collections } from '../pages/Collections/Collections'


export const Router = () => {
    return (
        <Switch>
            <Route exact path={['/', '/login']} >
                <Login/>
            </Route>

            <Route exact path={['/', '/signup']} >
                <SignUp/>
            </Route>

            <Route exact path={'/feed'} >
                <Feed/>
            </Route>

            <Route exact path={'/myimages'} >
                <MyImages/>
            </Route>

            <Route exact path={'/image/add'} >
                <CreateImage/>
            </Route>

            <Route exact path={'/collections'} >
                <Collections/>
            </Route>
        </Switch>
    )
}