import React from 'react';
import {Avatar, Button, Label, Spinner, TextInput} from 'flowbite-react';
import Compressor from 'compressorjs';

const AccountEdit = (props) => {

    const onAvatarUploadHandler = (e) => {
        const file = e.target.files[0]

        if (!file) {
            return;
        }

        new Compressor(file, {
            quality: 0.6,
            convertSize: 1000000, // 1M
            resize: "cover",
            height: 800,
            width: 800,
            success: (compressedFile) => {
                props.onAvatarChange(compressedFile)
            }
        })
    }

    return <div className="flex w-full h-full p-8">
        <div className="w-1/3">
            <div className="mb-4 block">
                <Avatar
                    img={props.newAvatar ? window.URL.createObjectURL(props.newAvatar) : props.account.avatar}
                    size="xl"
                    rounded>
                </Avatar>
            </div>

            <div className="flex block justify-center items-center">
                <input type="file" id="file" accept="image/png, image/jpeg"
                       onChange={onAvatarUploadHandler}
                />
            </div>

        </div>

        <div className="w-1/3">
            <div className="mb-2 block">
                <Label
                    htmlFor="name"
                    value="姓名"
                />
                <TextInput
                    id="name"
                    required
                    placeholder="請輸入姓名"
                    value={props.account.name}
                    onChange={(e) => {
                        props.onNameChange(e.target.value)
                    }}
                />
            </div>

            <div className="mb-2 block">
                <Label
                    htmlFor="nickname"
                    value="暱稱"
                />
                <TextInput
                    id="nickname"
                    required
                    placeholder="請輸入暱稱"
                    value={props.account.nickname}
                    onChange={(e) => {
                        props.onNicknameChange(e.target.value)
                    }}
                />
            </div>

            <div className="mb-2 block">
                <Label
                    htmlFor="mobile"
                    value="行動電話"
                />
                <TextInput
                    id="mobile"
                    required
                    placeholder="請輸入行動電話"
                    value={props.account.phone}
                    onChange={(e) => {
                        props.onPhoneChange(e.target.value)
                    }}
                />
            </div>

            <div className="mb-2 block">
                <Label
                    htmlFor="email"
                    value="Email"
                />
                <TextInput
                    id="email"
                    disabled
                    value={props.account.email}
                />
            </div>

            <div className="flex flex-row-reverse mb-2 block">
                <Button
                    color="success"
                    onClick={() => {
                        props.onSave()
                    }}
                    disabled={props.isSaving}
                >
                    {props.isSaving && <Spinner/>}
                    <span className={props.isSaving ? "ml-2" : ""}>
                        {props.isSaving ? "處理中" : "儲存"}
                    </span>
                </Button>
            </div>
        </div>
    </div>
}

export default AccountEdit