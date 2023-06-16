import _ from "lodash";
import {Card, Avatar, Label, Badge} from "flowbite-react";
import React from "react";

const CustomerCard = (props) => {
    const getDataIntegrityLevel = (dataIntegrity) => {
        if (dataIntegrity > 80) {
            return {
                color: "success",
                text: "完整"
            }
        } else if (dataIntegrity > 50) {
            return {
                color: "warning",
                text: "部分"
            }
        } else {
            return {
                color: "failure",
                text: "缺少"
            }
        }
    }

    return <Card className="w-2/3 max-w-[867px]">
        <div className="flex flex-row">
            <div className="flex flex-col items-center">
                <Avatar
                    rounded
                    placeholderInitials={_.get(props, "customer.name", "")}
                    size="lg"
                    img={_.get(props, "customer.avatar", "")}
                    bordered
                    color={_.get(props, "customer.gender", "Male") === "Male" ? "cyan" : "pink"}
                />
                <h5 className="mt-2 text-xl font-medium text-gray-900 dark:text-white">
                    {_.get(props, "customer.name", "")}
                </h5>
            </div>
            <div className="ml-6">
                <Label value="生日"></Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {_.get(props, "customer.birthday", "")}
                </p>

                <Label value="年齡"></Label>
                <p className="text-sm text-gray-500 dark:text-gray-400"></p>

                <Label value="聯絡方式"></Label>
                <p>
                    <a className="cursor-pointer font-medium hover:underline"
                       href={`tel:` + _.get(props, "customer.phones[0].phone", "")}>{_.get(props, "customer.phones[0].phone", "")}</a>
                </p>
            </div>

            <div className="ml-6">
                <Label value="資料完整度"></Label>
                <Badge
                    className="w-fit"
                    color={getDataIntegrityLevel(_.get(props, "customer.data_integrity", 0)).color}
                    size="sm"
                >
                    {getDataIntegrityLevel(_.get(props, "customer.data_integrity", 0)).text}
                </Badge>
            </div>
        </div>
    </Card>
}

export default CustomerCard