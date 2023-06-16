export const getAge = (birthdate) => {
    const now = new Date();
    const birthDate = new Date(birthdate);
    let age = now.getFullYear() - birthDate.getFullYear();
    const monthDiff = now.getMonth() - birthDate.getMonth();
    if (
        monthDiff < 0 ||
        (monthDiff === 0 && now.getDate() < birthDate.getDate())
    ) {
        age--;
    }
    return age;
};