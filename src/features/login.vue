<template>
    <div id="login">
        <div class="login-dialog" @keyup.enter="login">
            <img src="../assets/images/login-illustration.png"/>

            <h1>{{$t("Message.LoginTitle")}}</h1>

            <h5>{{$t("Message.LoginSubtitle")}}</h5>

            <el-input :placeholder="$t('Message.Username')" v-model="username" class="login-input username-input">
                <template slot="prepend">
                    <i class="el-icon-user"></i>
                </template>
            </el-input>

            <el-input :placeholder="$t('Message.Password')" v-model="password" show-password class="login-input password-input">
                <template slot="prepend">
                    <i class="el-icon-lock"></i>
                </template>
            </el-input>

            <el-button class="login-input login-button" type="primary" @click="login" round>
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
                this.$axios.post('/api/Auth/Login', {
                    loginName: _self.username,
                    password: _self.password
                }).then((response) => {
                    const AUTH_TOKEN = "Bearer " + response.token;
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
        height: 80px;
        line-height: 80px;
        border: none;
    }

    #login [class^=el-icon-] {
        font-size: 30px;
    }

    #login .el-input-group__prepend {
        padding: 20px 20px 20px 10px;
        background-color: #ffffff;
        color: #4E93FD;
        border: none;
    }

    #login .el-button.is-round {
        border-radius: 33px;
    }
</style>

<style scoped>
    #login {
        background-image: url("../assets/images/login-background.jpg");
        background-size: 1920px 969px;
        height: 100%;
        width: 100%;
    }

    .login-dialog {
        position: relative;
        width: 1200px; height: 700px;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        background-color: #ffffff;
        border-radius: 30px;
        box-shadow: 0px 0px 10px #0C4EF4;
    }

    .login-dialog img {
        position: absolute;
        top: 30px; left: 70px;
        width: 510px; height: 640px;
    }

    .login-dialog h1 {
        position: absolute;
        top: 120px;
        left: 656px;
        color: #333333;
        font-size: 44px;
        font-weight: 400;
    }

    .login-dialog h5 {
        position: absolute;
        top: 182px;
        left: 656px;
        color: #A9A9A9;
        font-size: 18px;
        font-weight: 400;
    }

    .login-input {
        position: absolute;
        left: 656px;
        width: 360px;
        height: 80px;
    }

    .username-input {
        top: 252px;
        border-bottom: 2px solid #EEEEEE;
    }

    .password-input {
        top: 364px;
        border-bottom: 2px solid #EEEEEE;
    }
    
    .username-input:focus-within, .password-input:focus-within {
        border-bottom: 2px solid #4EA3FF;
    }

    .login-button {
        top: 506px;
        height: 66px;
        width: 320px;
        font-size: 28px;
    }
</style>