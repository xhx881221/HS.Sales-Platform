export const userMixin = {
    data: function() {
        const validate_price = (rule, value, callback) => {
            if (/^[1-9]\d*(\.\d{1,2})?$|^0\.\d?[1-9]*$/.test(value)) {
                callback()
            } else {
                callback(new Error(this.$t("Message.PleaseEnterTheCorrectPrice")));
            }
        }

        const validate_unit = (rule, value, callback) => {
            if (/^[\u4e00-\u9fa5A-Za-z]{1,}$/.test(value)) {
                callback()
            } else {
                callback(new Error(this.$t("Message.PleaseEnterTheCorrectUnit")));
            }
        }

        return {
            submitFormRules: {
                name: [{required: true, message: this.$t("Message.PleaseEnterTheName"), trigger: ['blur', 'change']}],
                code: [{required: true, message: this.$t("Message.PleaseEnterTheCode"), trigger: ['blur', 'change']}],
                price: [{required: true, validator: validate_price, trigger: ['blur', 'change']}],
                unit: [{required: true, validator: validate_unit, trigger: ['blur', 'change']}],
                amount: [{required: true, message: this.$t("Message.PleaseEnterTheAmount"), trigger: ['blur', 'change']}],
            },
            multipleSelection: [],
            pagination: {
                currentPage: 1,
                pageSize: 20,
                total: 0
            },
            tableHeaderCellStyle: {
                "background-color": "rgba(75, 164, 255, 1)",
                "color": "#ffffff",
                "padding": "10px 0"
            },
            tableCellStyle: {
                "padding": "0"
            },
            searchParam: ""
        }
    },
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
        }
    }
}