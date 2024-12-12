import { useCallback, useEffect } from 'react'
import { Profile } from 'pages/profilePage/profile'
import { useSelector } from 'react-redux'
import { getProfile, getStatus } from 'redux/profileReducer'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from 'redux/store'
import { Typography } from 'components/common'
import { authorizedUserIdSelector } from 'pages/loginPage'
import { MyFriends } from 'pages/profilePage/myFriends/MyFriends'

type PathParams = {
    userId?: string | undefined
}



export const ProfilePage = () => {
    const authorizedUserId = useSelector(authorizedUserIdSelector)
    const { userId } = useParams<PathParams>()
    const dispatch = useAppDispatch()

    const meId = String(authorizedUserId)

    const id = userId ? Number(userId) : authorizedUserId

    const refreshProfile = useCallback(async () => {
        if (id) {
            dispatch(getProfile(id))
            dispatch(getStatus(id))
        }
    }, [id, dispatch])

    useEffect(() => {
        refreshProfile()
    }, [refreshProfile])

    const showFriends = id && meId && String(id) === meId

    return (
        <section>
            <Typography variant={'h2'} as={'h2'}>
                Profile
            </Typography>
            <Profile isOwner={!userId} />
            {showFriends && <MyFriends />}
        </section>
    )
}
