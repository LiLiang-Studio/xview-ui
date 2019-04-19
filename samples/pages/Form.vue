<template>
  <div>
    <div class="page-title">Form 表单</div>
    <p>具有数据收集、校验和提交功能的表单，包含复选框、单选框、输入框、下拉选择框等元素。</p>

    <div class="page-sub-title">设置属性 inline，表单元素可以水平排列。</div>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="user">
        <Input type="text" v-model="formInline.user" placeholder="Username">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="formInline.password" placeholder="Password">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
      </FormItem>
    </Form>

    <div class="page-sub-title">表单控件</div>
    <p>
      在 Form 内，每个表单域由 FormItem 组成，可包含的控件有：Input、Radio、Checkbox、Switch、Select、
      Slider、DatePicker、TimePicker、Cascader、Transfer、InputNumber、Rate、Upload、AutoComplete、ColorPicker。
    </p>
    <br>
    <p>给 FormItem 设置属性 label 可以显示表单域的标签，需要给 Form 设置 label-width</p>
    <br>
    <p>给 FormItem 设置属性 label-for 可以指定原生的 label 标签的 for 属性，配合设置控件的 element-id 属性，可以点击 label 时聚焦控件。</p>
    <br>
    <Form :model="formItem" :label-width="80">
      <FormItem label="Input">
        <Input v-model="formItem.input" placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="Select">
        <Select v-model="formItem.select">
          <Option value="beijing">New York</Option>
          <Option value="shanghai">London</Option>
          <Option value="shenzhen">Sydney</Option>
        </Select>
      </FormItem>
      <FormItem label="Radio">
        <RadioGroup v-model="formItem.radio">
          <Radio label="male">Male</Radio>
          <Radio label="female">Female</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="Checkbox">
        <CheckboxGroup v-model="formItem.checkbox">
          <Checkbox label="Eat"></Checkbox>
          <Checkbox label="Sleep"></Checkbox>
          <Checkbox label="Run"></Checkbox>
          <Checkbox label="Movie"></Checkbox>
        </CheckboxGroup>
      </FormItem>
      <FormItem label="Switch">
        <i-switch v-model="formItem.switch" size="large">
          <span slot="open">On</span>
          <span slot="close">Off</span>
        </i-switch>
      </FormItem>
      <FormItem label="Slider">
        <Slider v-model="formItem.slider" range></Slider>
      </FormItem>
      <FormItem label="Text">
        <Input
          v-model="formItem.textarea"
          type="textarea"
          :autosize="{minRows: 2,maxRows: 5}"
          placeholder="Enter something..."
        ></Input>
      </FormItem>
      <FormItem>
        <Button type="primary">Submit</Button>
        <Button type="ghost" style="margin-left: 8px">Cancel</Button>
      </FormItem>
    </Form>

    <div class="page-sub-title">设置属性 label-position，可以改变表单域标签的位置，left 为左对齐，right 为右对齐，top 会置于表单域顶部。</div>
    <Form :model="formLeft" label-position="left" :label-width="100">
      <FormItem label="Title">
        <Input v-model="formLeft.input1"></Input>
      </FormItem>
      <FormItem label="Title name">
        <Input v-model="formLeft.input2"></Input>
      </FormItem>
      <FormItem label="Aligned title">
        <Input v-model="formLeft.input3"></Input>
      </FormItem>
    </Form>
    <Form :model="formRight" label-position="right" :label-width="100">
      <FormItem label="Title">
        <Input v-model="formRight.input1"></Input>
      </FormItem>
      <FormItem label="Title name">
        <Input v-model="formRight.input2"></Input>
      </FormItem>
      <FormItem label="Aligned title">
        <Input v-model="formRight.input3"></Input>
      </FormItem>
    </Form>
    <Form :model="formTop" label-position="top">
      <FormItem label="Title">
        <Input v-model="formTop.input1"></Input>
      </FormItem>
      <FormItem label="Title name">
        <Input v-model="formTop.input2"></Input>
      </FormItem>
      <FormItem label="Aligned title">
        <Input v-model="formTop.input3"></Input>
      </FormItem>
    </Form>

    <!-- <div class="page-sub-title">表单验证</div>
    <p>给 Form 设置属性 rules，同时给需要验证的 FormItem 设置属性 prop 指向对应字段即可。验证方法也支持 Promise。</p>
    <br>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="Name" prop="name">
        <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
      </FormItem>
      <FormItem label="E-mail" prop="mail">
        <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
      </FormItem>
      <FormItem label="City" prop="city">
        <Select v-model="formValidate.city" placeholder="Select your city">
          <Option value="beijing">New York</Option>
          <Option value="shanghai">London</Option>
          <Option value="shenzhen">Sydney</Option>
        </Select>
      </FormItem>
      <FormItem label="Gender" prop="gender">
        <RadioGroup v-model="formValidate.gender">
          <Radio label="male">Male</Radio>
          <Radio label="female">Female</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="Hobby" prop="interest">
        <CheckboxGroup v-model="formValidate.interest">
          <Checkbox label="Eat"></Checkbox>
          <Checkbox label="Sleep"></Checkbox>
          <Checkbox label="Run"></Checkbox>
          <Checkbox label="Movie"></Checkbox>
        </CheckboxGroup>
      </FormItem>
      <FormItem label="Desc" prop="desc">
        <Input
          v-model="formValidate.desc"
          type="textarea"
          :autosize="{minRows: 2,maxRows: 5}"
          placeholder="Enter something..."
        ></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
        <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
      </FormItem>
    </Form>

    <div class="page-sub-title">自定义验证</div>
    <p>可以完全自定义验证规则来完成更复杂的验证，比如某些数据需要在服务端验证时。示例展示的是密码的二次确认及模拟的一个异步验证。</p>
    <br>
    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
      <FormItem label="Password" prop="passwd">
        <Input type="password" v-model="formCustom.passwd"></Input>
      </FormItem>
      <FormItem label="Confirm" prop="passwdCheck">
        <Input type="password" v-model="formCustom.passwdCheck"></Input>
      </FormItem>
      <FormItem label="Age" prop="age">
        <Input type="text" v-model="formCustom.age" number></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formCustom')">Submit</Button>
        <Button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">Reset</Button>
      </FormItem>
    </Form>

    <div class="page-sub-title">动态增减表单项</div>
    <p>当需要动态维护 FormItem 时，也可以直接给 FormItem 设置属性 rules 来单独为该域做验证</p>
    <p>动态设置 FormItem 的 prop 属性时，会依据上层的 Form 组件的 model 来获取，查看示例代码。</p>
    <p>FormItem 还可以独立设置 required、error 等属性，详见 API。</p>
    <br>
    <Form ref="formDynamic" :model="formDynamic" :label-width="80" style="width: 300px">
      <FormItem
        v-for="(item, index) in formDynamic.items"
        v-if="item.status"
        :key="index"
        :label="'Item ' + item.index"
        :prop="'items.' + index + '.value'"
        :rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}"
      >
        <Row>
          <Col span="18">
            <Input type="text" v-model="item.value" placeholder="Enter something..."></Input>
          </Col>
          <Col span="4" offset="1">
            <Button type="ghost" @click="handleRemove(index)">Delete</Button>
          </Col>
        </Row>
      </FormItem>
      <FormItem>
        <Row>
          <Col span="12">
            <Button type="dashed" long @click="handleAdd" icon="plus-round">Add item</Button>
          </Col>
        </Row>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formDynamic')">Submit</Button>
        <Button type="ghost" @click="handleReset('formDynamic')" style="margin-left: 8px">Reset</Button>
      </FormItem>
    </Form> -->
  </div>
</template>
<script>
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your password"));
      } else {
        if (this.formCustom.passwdCheck !== "") {
          // 对第二个密码框单独验证
          this.$refs.formCustom.validateField("passwdCheck");
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your password again"));
      } else if (value !== this.formCustom.passwd) {
        callback(new Error("The two input passwords do not match!"));
      } else {
        callback();
      }
    };
    const validateAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Age cannot be empty"));
      }
      // 模拟异步验证效果
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("Please enter a numeric value"));
        } else {
          if (value < 18) {
            callback(new Error("Must be over 18 years of age"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    return {
      formInline: {
        user: "",
        password: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password.",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur"
          }
        ]
      },
      formItem: {
        input: "",
        select: "",
        radio: "male",
        checkbox: [],
        switch: true,
        date: "",
        time: "",
        slider: [20, 50],
        textarea: ""
      },
      formLeft: {
        input1: "",
        input2: "",
        input3: ""
      },
      formRight: {
        input1: "",
        input2: "",
        input3: ""
      },
      formTop: {
        input1: "",
        input2: "",
        input3: ""
      },
      formValidate: {
        name: "",
        mail: "",
        city: "",
        gender: "",
        interest: [],
        date: "",
        time: "",
        desc: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        mail: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur"
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" }
        ],
        city: [
          {
            required: true,
            message: "Please select the city",
            trigger: "change"
          }
        ],
        gender: [
          { required: true, message: "Please select gender", trigger: "change" }
        ],
        interest: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "Choose at least one hobby",
            trigger: "change"
          },
          {
            type: "array",
            max: 2,
            message: "Choose two hobbies at best",
            trigger: "change"
          }
        ],
        date: [
          {
            required: true,
            type: "date",
            message: "Please select the date",
            trigger: "change"
          }
        ],
        time: [
          {
            required: true,
            type: "string",
            message: "Please select time",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "Please enter a personal introduction",
            trigger: "blur"
          },
          {
            type: "string",
            min: 20,
            message: "Introduce no less than 20 words",
            trigger: "blur"
          }
        ]
      },
      formCustom: {
        passwd: "",
        passwdCheck: "",
        age: ""
      },
      ruleCustom: {
        passwd: [{ validator: validatePass, trigger: "blur" }],
        passwdCheck: [{ validator: validatePassCheck, trigger: "blur" }],
        age: [{ validator: validateAge, trigger: "blur" }]
      },
      index: 1,
      formDynamic: {
        items: [
          {
            value: "",
            index: 1,
            status: 1
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    handleAdd() {
      this.index++;
      this.formDynamic.items.push({
        value: "",
        index: this.index,
        status: 1
      });
    },
    handleRemove(index) {
      this.formDynamic.items[index].status = 0;
    }
  }
};
</script>
<style lang="less">
</style>