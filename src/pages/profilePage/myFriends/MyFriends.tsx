import { useEffect, useMemo } from 'react'

export const MyFriends = ({ isActive }: { isActive: boolean }) => {
    const filter = useMemo(() => ({
        isFriend: true,
        isActive,
    }), [isActive])

    useEffect(() => {
        console.log(filter)
    }, [filter])

    return <div>My Friends</div>
}
