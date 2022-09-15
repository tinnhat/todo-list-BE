api đã tạo:

//user
register: "/user/signin"
login: "/user/login"
getAll: "user/getAll"
getOne: "user/getOne/:id"
update: "user/update/:id" (làm chức năng quên mật khẩu(gửi qua mail "/email/send"),đổi thông tin user)
delete: "user/delete/:id" (page admin)

//bài post
//phải đăng nhập mới post bài được
tạo: "/api/post"
sửa:"api/update/:id"
getAll :"api/getAll"
getOne :"api/getOne/:id"
Delete :"api/delete/:id"

//to do list

tạo: "/todo/create"
sửa:"todo/update/:id"
getAll :"todo/getAll" (get all to do của mọi user)
getOne :"todo/getOne/:id"
Delete :"todo/delete/:id"
