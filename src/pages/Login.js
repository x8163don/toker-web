import React, {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import axios, {HttpStatusCode} from "axios";
import {Link} from "react-router-dom";
import {Alert} from "flowbite-react";

const LoginPage = () => {
    const [isShowErrorAlert, setIsShowErrorAlert] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Email 格式不正確").required("請填寫帳號"),
            password: Yup.string().required("請填寫密碼"),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post("accounts:login", {
                    account: values.email,
                    password: values.password,
                });
                if (response.status === HttpStatusCode.Ok) {
                    axios.defaults.headers.common['Authorization'] = response.data.token;
                    window.location.href = "/customers";
                }
            } catch (e) {
                setErrorMessage(e.response.data.message)
                setIsShowErrorAlert(true)
                setTimeout(() => {
                    setIsShowErrorAlert(false)
                }, 3000)
            }
        },
    });

    return (
        <div className="mx-auto md:h-screen flex flex-col justify-center items-center px-6 pt-8 pt:mt-0">
            <Link to="/" class="text-2xl font-semibold flex justify-center items-center mb-8 lg:mb-10">
                <img src="/images/logo.svg" className="h-10 mr-4" alt="Logo"/>
                <span className="self-center text-2xl font-bold whitespace-nowrap">拓客</span>
            </Link>

            <div className="bg-white shadow rounded-lg md:mt-0 w-full sm:max-w-screen-sm xl:p-0">
                <div className="p-6 sm:p-8 lg:p-16 space-y-8">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900"> 登入平台</h2>
                    <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">帳號</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                placeholder="name@company.com" required
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                onBlur={formik.handleBlur}
                            />
                            <label
                                className="mt-1 h-1 text-sm font-medium text-red-600 block mb-2">{formik.touched.email && formik.errors.email ? (
                                <div>• {formik.errors.email}</div>) : <div></div>}
                            </label>
                        </div>
                        <div>
                            <label htmlFor="password"
                                   className="text-sm font-medium text-gray-900 block mb-2">密碼</label>
                            <input type="password" name="password" id="password" placeholder="••••••••"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                   required
                                   onChange={formik.handleChange}
                                   value={formik.values.password}
                                   onBlur={formik.handleBlur}/>
                            <label className="mt-1 h-1 text-sm font-medium text-red-600 block mb-2">
                                {formik.touched.password && formik.errors.password ? (
                                    <div>• {formik.errors.password}</div>) : <div></div>}
                            </label>
                        </div>
                        <button type="submit"
                                className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center">登入
                        </button>
                    </form>
                </div>
            </div>
            {isShowErrorAlert ? <Alert color="failure" className="fixed flex"> <span>{errorMessage}</span> </Alert> : null}
        </div>);
};

export default LoginPage;