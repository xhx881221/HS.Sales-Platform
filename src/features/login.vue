<template>
    <div id="login">
        <div class="login-dialog" @keyup.enter="login">
            <img src="../assets/images/login-background.png">
            <h1>{{$t("Message.LoginTitle")}}</h1>

            <el-input :placeholder="$t('Table.Username')" v-model="username" class="login-input username-input">
                <template slot="prepend">
                    <i class="fa fa-user fa-2x fa-fw" aria-hidden="true"></i>
                </template>
            </el-input>

            <el-input :placeholder="$t('Table.Password')" v-model="password" show-password class="login-input password-input">
                <template slot="prepend">
                    <i class="fa fa-unlock-alt fa-2x fa-fw" aria-hidden="true"></i>
                </template>
            </el-input>

            <el-button class="login-input login-button" type="primary" @click="login">
                {{$t("Button.Login")}}
            </el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            /**
		     * @method login
		     * @param {Void} 无参数
		     * @return {Void} 无返回值
		     */
            login () {
                let _self = this;
                this.$axios.post('/api/User/Login', {
                    loginName: _self.username,
                    password: _self.password
                }).then((response) => {
                    const AUTH_TOKEN = "Bearer " + response.data.data;
                    sessionStorage.setItem('token', AUTH_TOKEN);
                    sessionStorage.setItem('username', _self.username);
                    _self.$router.push('home');
                })
            }
        }
    }
</script>

<style>
    .el-input-group__append, .el-input-group__prepend {
        background-color: #8EC2F9;
        border: 1px solid #8EC2F9;
        color: #ffffff;
    }

    #login .el-input__inner {
        height: 56px;
        line-height: 56px;
    }
</style>

<style scoped>
    #login {
        background: url("./assets/logo-background.png");
        background-size: 1920px 969px;
        height: 100%;
        width: 100%;
        background-color:#178BFE;
    }

    .login-dialog {
        position: relative;
        width: 580px; height: 520px;
        top: 200px;
        left: calc((100% - 580px) / 2);
        background-color: rgb(227, 240, 253);
        border: 1px solid rgba(136,194,255,1);
        border-radius: 2px;
    }

    .login-dialog img {
        position: absolute;
        top: 64px; left: 62px;
        width: 66px; height: 39px;
    }

    .login-dialog h1 {
        position: absolute;
        top: 72px;
        left: 132px;
        color: #338FF1;
        font-size: 26px;
        font-weight: 600;
        letter-spacing: 0.2em;
    }

    .login-input {
        position: absolute;
        left: 60px;
        width: calc(100% - 60px - 60px);
        height: 56px;
    }

    .username-input {
        top: 160px;
    }

    .password-input {
        top: 250px;
    }

    .login-button {
        top: 360px;
    }
</style>