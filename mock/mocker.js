module.exports = {
    'POST /api/Test/Login': (req, res) => {
        return res.json({
            status: 'ok',
            code: 200,
            data: {
                test: "测试数据啦"
            }
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