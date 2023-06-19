export const Phone = Object.freeze({
    "HOME": "home",
    "MOBILE": "mobile",
    "COMPANY": "company",
})

export const PHONE_LABEL = {
    [Phone.HOME]: "住家電話",
    [Phone.MOBILE]: "行動電話",
    [Phone.COMPANY]: "公司電話",
}

export const Address = Object.freeze({
    "HOME": "home",
    "COMPANY": "company",
})

export const ADDRESS_LABEL = {
    [Address.HOME]: "住家地址",
    [Address.COMPANY]: "公司地址",
}

export const phoneAliases = ["行動電話", "住家", "公司", "其它"]

export const addressAliases = ["住家", "公司", "其它"]