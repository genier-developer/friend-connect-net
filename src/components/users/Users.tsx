import React, { useEffect } from 'react'
import { PaginationPage } from 'components/common/pagination/PaginationPage'
import { User } from './User'
import { getUsersTC } from 'redux/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
    currentPageSelector, getIsFetching,
    pageSizeSelector,
    totalUsersCount,
    usersFilterSelector,
    usersSelector
} from 'components/users/usersSelectors'
import { UsersSearchForm } from 'components/users/UsersSearchForm'
import { useHistory, useLocation } from 'react-router-dom'
import { Col, Row } from 'antd'
import s from './Users.module.css'
import { Preloader } from 'components/common/preloader'

export const Users = () => {

    const users = useSelector(usersSelector)
    const totalCount = useSelector(totalUsersCount)
    const currentPage = useSelector(currentPageSelector)
    const pageSize = useSelector(pageSizeSelector)
    const filter = useSelector(usersFilterSelector)
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const isFetching = useSelector(getIsFetching)

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const page = searchParams.get('page')
        const term = searchParams.get('term')
        const friend = searchParams.get('friend')

        let actualPage = currentPage
        if (page) actualPage = Number(page)

        let actualFilter = filter
        if (term) {
            actualFilter = { ...actualFilter, term: term }
        }
        if (friend) {
            actualFilter = { ...actualFilter, friend: friend === 'null' ? null : friend === 'true' }
        }
        dispatch(getUsersTC(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        history.push({
            pathname: '/users',
            search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
        })
    }, [filter, currentPage])

    return (
        <>
            <Row className={s.filterBlock}>
                <Col span={14}>
                    <UsersSearchForm pageSize={pageSize} />
                </Col>

                <Col span={10}>
                    <PaginationPage currentPage={currentPage}
                                    totalCount={totalCount}
                                    filter={filter}
                    />
                </Col>
            </Row>

            {isFetching ? <Preloader /> : null}

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {users.map(user => <User key={user.id} user={user} />)}
            </div>

        </>
    )
}

