import React, {useState, useEffect} from 'react';
import AccountEdit from "../components/account/AccountEdit";
import {getAccount, updateAccount, uploadAvatar} from "../data/account/account";

const Account = () => {

    const [account, setAccount] = useState({});
    const [isSaving, setIsSaving] = useState(false);
    const [newAvatar, setNewAvatar] = useState(null);

    useEffect(() => {
        getAccount().then(r => {
            setAccount(r)
        })
    }, [])

    const saveHandler = async () => {
        const accountInfo = account
        setIsSaving(true)
        try {
            if (newAvatar) {
                const avatarUrl = await uploadAvatar(newAvatar)
                accountInfo.avatar = avatarUrl
            }
            await updateAccount(accountInfo)
            const newAccountInfo = await getAccount()
            setAccount(newAccountInfo)
        } catch (e) {
            console.log(e)
        } finally {
            setIsSaving(false)
        }
    }

    const avatarChangeHandler = (file) => {
        setNewAvatar(file)
    }

    return <AccountEdit
        account={account}
        newAvatar={newAvatar}
        isSaving={isSaving}
        onAvatarChange={avatarChangeHandler}
        onNameChange={(v) => setAccount({...account, name: v})}
        onNicknameChange={(v) => setAccount({...account, nickname: v})}
        onEmailChange={(v) => setAccount({...account, email: v})}
        onPhoneChange={(v) => setAccount({...account, phone: v})}
        onSave={saveHandler}
    ></AccountEdit>
}

export default Account