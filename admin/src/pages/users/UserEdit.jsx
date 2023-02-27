import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useTranslation from '../../components/translation/useTranslation';
import TextInput from '../../components/inputs/TextInput';
import SelectInput from '../../components/inputs/SelectInput';
import { Button, Space, Spin, message, notification } from "antd"
import { EditOutlined } from "@ant-design/icons"
import { useParams } from "react-router-dom";
import API from '../../utils/API';
import './edit-user.scss'

export default function UserEdit() {
    let history = useHistory();
    const { trans } = useTranslation();
    const { id } = useParams();

    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState([]);
    const { register, handleSubmit, control, getValues, reset, formState: { errors } } = useForm();

    const selectBranch = [
        { label: 'tbilisi', value: 0 },
        { label: 'kutaisi', value: 1 }
    ]

    const selectPositions = [
        { label: 'manager', value: 0 },
        { label: 'admin', value: 1 }
    ]

    const onSubmit = (data) => {
        let arr = ["identificationNumber", "fullName", "email", "phoneNumber", "password", "branchId", "positionId", "username"];
        const filteredByKey = Object.fromEntries(
            Object.entries(data).filter(([key]) => arr.includes(key))
        )
        setLoading(true)
        API.put("/put-requests-handler", { url: `/Security/users/${id}`, data: filteredByKey })
            .then((res) => {
                setLoading(false)
                history.goBack();
            })
            .catch((err) => {
                setLoading(false);
                notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"})
            })
    }

    useEffect(() => {
        setLoading(true)
        API.get(`/get-requests-handler`, { params: { url: `/Security/users/${id}` } })
            .then((res) => {
                setLoading(false)
                reset(res?.data);
                setUserData(res?.data);
               
            })
            .catch((err) => {
                setLoading(false);
                notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"});
            })
        // eslint-disable-next-line
    }, []);

    return (
        <div className="content-wrapper">
            {loading &&
                <Space size="middle" className='loading'>
                    <Spin size="large" />
                </Space>
            }
            <div className="edit-form-wrapper card">
                <div className="edit-user-header">
                    <EditOutlined />
                    {/* <i className="fa fa-pencil-square " aria-hidden="true"/> */}
                    <h3 onClick={() => alert(userData)}>{trans('edit_user')}</h3>
                </div>
                <hr />
                <div className="card-body">
                    <form method="PUT" onSubmit={handleSubmit(onSubmit)}>
                        <div className="inputs">
                            <TextInput
                                id="username"
                                name="username"
                                label={trans('username')}
                                placeholder={trans('username')}
                                // defaultValue={userData.username}
                                control={control}
                                type="text"
                                register={register}
                                rules={{
                                    required: trans('field_required')
                                }}
                                errorMessage={errors.username}
                            />
                            <TextInput
                                id="personal_number"
                                name="identificationNumber"
                                label={trans('personal_number')}
                                placeholder={trans('personal_number')}
                                // defaultValue={userData.personal_number}
                                type="text"
                                register={register}
                                rules={{
                                    required: trans('field_required')
                                }}
                                errorMessage={errors.identificationNumber}
                            />
                            <TextInput
                                id="password"
                                name="password"
                                label={trans('password')}
                                placeholder={trans('password')}
                                // defaultValue={userData.password}
                                type="password"
                                register={register}
                                rules={{
                                    required: false
                                }}
                            />
                            <TextInput
                                id="email"
                                name="email"
                                label={trans('email')}
                                placeholder={trans('email')}
                                // defaultValue={userData.email}
                                type="text"
                                register={register}
                                rules={{
                                    required: trans('field_required'),
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: trans('email_error')
                                    }
                                }}
                                errorMessage={errors.email}
                            />
                            <SelectInput
                                label={trans('branch')}
                                placeholder={`${trans('select')}...`}
                                name="branchId"
                                options={selectBranch}
                                index={userData?.branchId}
                                control={control}
                                getValues={getValues}
                                register={register}

                            />
                            <SelectInput
                                label={trans('position')}
                                placeholder={`${trans('select')}...`}
                                name="positionId"
                                index={userData?.positionId}
                                options={selectPositions}
                                control={control}
                                getValues={getValues}
                                register={register}
                            />
                            <TextInput
                                id="fullname"
                                name="fullName"
                                label={trans('fullname')}
                                placeholder={trans('fullname')}
                                // defaultValue={userData.fullname}
                                type="text"
                                register={register}
                                rules={{
                                    required: trans('field_required')
                                }}
                                errorMessage={errors.fullName}
                            />

                            <TextInput
                                id="phone"
                                name="phoneNumber"
                                label={trans('phone')}
                                placeholder={trans('phone')}
                                // defaultValue={userData.phone}
                                type="text"
                                register={register}
                                rules={{
                                    required: trans('field_required'),
                                    pattern: {
                                        value: /^\d*$/,
                                        message: trans('phone_number_error')
                                    }
                                }}
                                errorMessage={errors.phoneNumber}
                            />
                        </div>
                        <hr />
                        <div className="save-button">
                            <button  className="success-btn focus-white" type="submit" name="submit">
                                {trans('save_changes')}
                            </button>
                            <Link to="/users" style={{ marginLeft: "15px" }}>
                                <Button type="defult">
                                    {trans('cancel')}
                                </Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

