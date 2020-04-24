module.exports = {
    'GET /api/Plate/GetAll': (req, res) => {
        return res.send({
            status: 'ok',
            code: 200,
            data: [
                {
                    id: "1",
                    name: "测试板块1",
                    comment: "测试板块1"
                },
                {
                    id: "2",
                    name: "测试板块1",
                    comment: "测试板块1"
                },
                {
                    id: "3",
                    name: "测试板块1",
                    comment: "测试板块1"
                },
                {
                    id: "4",
                    name: "测试板块1",
                    comment: "测试板块1"
                },
                {
                    id: "5",
                    name: "测试板块1",
                    comment: "测试板块1"
                },
                {
                    id: "6",
                    name: "测试板块1",
                    comment: "测试板块1"
                },
                {
                    id: "7",
                    name: "测试板块1",
                    comment: "测试板块1"
                },
                {
                    id: "8",
                    name: "测试板块1",
                    comment: "测试板块1"
                },
                {
                    id: "9",
                    name: "测试板块1",
                    comment: "测试板块1"
                }
        
            ]
        })
    },
    'POST /login/account': (req, res) => {
        const { password, username } = req.body;
        if (password === '888888' && username === 'admin') {
            return res.send({
                status: 'ok',
                code: 200,
                token: 'sdfsdfsdfdsf',
                data: { id: 1, name: '刘小夕' }
            })
        } else {
            return res.send({ status: 'error', code: 403 })
        }
    }
}