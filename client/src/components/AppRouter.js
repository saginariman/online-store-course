import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Context } from '..';
import AdminPanel from '../pages/AdminPanel';
import Shop from '../pages/Shop'
import { authRoutes, publicRoutes } from '../routes';

const AppRouter = observer(() => {
    const {user} = useContext(Context);
    return (
        <div>
            <Routes>
                {user.isAuth && authRoutes.map(({path, Component}) =>{
                    return <Route key={path} path={path} element={Component} exact/>
                })}
                {publicRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={Component} exact/>
                )}
                <Route path="*" element={<Shop />} />
            </Routes>
        </div>
    )
})

export default AppRouter