import React from "react";
import {useFormik} from "formik";
import * as Yup from "yup";

const LoginPage = () => {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("無效的 Email 格式").required("必填"),
            password: Yup.string()
                .min(6, "密碼至少需要 6 個字元")
                .required("必填"),
        }),
        onSubmit: async (values) => {
            const response = await axios.post("http://your-api.com/login", {
                account: values.email,
                password: values.password,
            });
            console.log(values); // 在這裡可以進行表單的提交
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="email">帳號：</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                ) : null}
            </div>

            <div>
                <label htmlFor="password">密碼：</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                ) : null}
            </div>

            <button type="submit">登入</button>
        </form>
    );
};

export default LoginPage;