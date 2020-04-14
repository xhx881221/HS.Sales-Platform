export const userMixin = {
    data: function() {
        //校验版本号
        let validate_version = (rule, value, callback) => {
            if ( /^\d+\.\d+\.\d+$/.test(value)) {
                callback();
            } else {
                callback(new Error(this.$t("Message.PleaseEnterCorrectReleaseVersionNumber")))
            }
        }

        return {
            expand: false,
            hoverIndex: undefined,
            multipleSelection: [],
            tableData: [],
            pagination: {
                currentPage: 1,
                pageSize: 20,
                total: 0
            },
            messageCanAppear: true,
            searchParam: "",
            submitFormRules: {
                version: [
                    {required: true, message: this.$t("Message.PleaseEnterReleaseVersionNumber"), trigger: ['blur', 'change']},
                    {validator: validate_version, trigger: ['blur', 'change']}
                ]
            },
            applicationsWithAll: [{
                id: "",
                name: this.$t("Message.All")
            }],
            platFormsWithAll: [{
                id: "",
                name: this.$t("Message.All")
            }],
            applications: [],
            platForms: [],
            uploadURL: "",
            uploadHeader: {},
            uploadAccept: "",
            visible: false,
            downloadUrl: ""
        }
    },
    methods: {
        handleMouseenter(index) {
            this.hoverIndex = index;
        },
        handleMouseleave() {
            this.hoverIndex = undefined;
            this.expand = false;
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        select(row, column) {
            if (column.label !== this.$t("Table.Operating")) {
                this.$refs.tableData.toggleRowSelection(row);
            }
        },
        handleCurrentChange(val) {
            this.pagination.currentPage = val;
            if (this.searchParam !== "") {
                this.searchParam.page = val;
            }
            this.getTableData();
        },
        deleteTableContent(index, row) {
            this._handleDetele([].concat(row.id));
        },
        deleteTableContents() {
            let _self = this;
            if (this.multipleSelection.length === 0) {
                if (!this.messageCanAppear) {
                    return;
                }
                this.messageCanAppear = false;
                this.$message({
                    message: this.$t("Message.AtLeastOneDataNeedsToBeSelected"),
                    type: 'warning',
                    onClose: function() {
                        _self.messageCanAppear = true;
                    }
                });
                return;
            } else {
                let ids = [];
                this.multipleSelection.forEach((element) => {
                    ids.push(element.id);
                });
                this._handleDetele(ids);
            }
        },
        editTableContents() {
            let _self = this;
            if (this.multipleSelection.length !== 1) {
                if (!this.messageCanAppear) {
                    return;
                }
                this.messageCanAppear = false;
                this.$message({
                    message: this.$t("Message.CanOnlySelectOneData"),
                    type: 'warning',
                    onClose: function() {
                        _self.messageCanAppear = true;
                    }
                });
            } else {
                this.editTableContent(undefined, this.multipleSelection[0])
            }
        },
         /**
         * @method _getApplication 内部函数，用于获取APP列表
         * @param {Void}
         * @return {Void}
         */
        _getApplication() {
            let _self = this;
            this.$axios.get('/api/Package/GetAll').then((response) => {
                _self.applications = response.data.data;
                _self.applicationsWithAll = _self.applicationsWithAll.concat(_self.applications);
            });
        },
            /**
         * @method _getPlatForm 内部函数，用于获取平台列表
         * @param {Void}
         * @return {Void}
         */
        _getPlatForm() {
            let _self = this;
            this.$axios.get('/api/PlatForm/GetAll').then((response) => {
                _self.platForms = response.data.data;
                _self.platFormsWithAll = _self.platFormsWithAll.concat(_self.platForms);
            });
        },
        download(index, row) {
            this.downloadUrl = row.url;
            this.visible = true;
        }
    }
}