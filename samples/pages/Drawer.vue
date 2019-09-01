<template>
  <div>
    <div class="page-title">Drawer 抽屉</div>
    <p>抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到到原任务。</p>
    <div class="page-sub-title">何时使用</div>
    <p>当需要一个附加的面板来控制父窗体内容，这个面板在需要时呼出。比如，控制界面展示样式，往界面中添加内容</p>
    <p>当需要在当前任务流中插入临时任务，创建或预览附加内容。比如展示协议条款，创建子对象。</p>

    <div class="page-sub-title">基础抽屉</div>
    <p>基础抽屉，点击触发按钮抽屉从右滑出，点击遮罩区关闭。</p>
    <Button @click="value1 = true" type="primary">Open</Button>
    <Drawer title="Basic Drawer" :closable="false" v-model="value1">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <template slot="footer">
        <Button>取消</Button>
        <Button type="primary">确定</Button>
      </template>
    </Drawer>

    <div class="page-sub-title">左侧滑出</div>
    <p>基础抽屉，点击触发按钮抽屉从左滑出，点击遮罩区关闭。</p>
    <Button @click="value2 = true" type="primary">Open</Button>
    <Drawer title="Basic Drawer" placement="left" :closable="false" v-model="value2">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>

    <div class="page-sub-title">对象编辑</div>
    <p>用于承载编辑相关操作，需要点击关闭按钮关闭</p>
    <div>
      <Button @click="value3 = true" type="primary">Create</Button>
      <Drawer title="Create" v-model="value3" width="720" :mask-closable="false">
        <Form :model="formData">
          <Row :gutter="32">
            <Col span="12">
              <FormItem label="Name" label-position="top">
                <Input v-model="formData.name" placeholder="please enter user name" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="Url" label-position="top">
                <Input v-model="formData.url" placeholder="please enter url">
                  <span slot="prepend">http://</span>
                  <span slot="append">.com</span>
                </Input>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="32">
            <Col span="12">
              <FormItem label="Owner" label-position="top">
                <Select v-model="formData.owner" placeholder="please select an owner">
                  <Option value="jobs">Steven Paul Jobs</Option>
                  <Option value="ive">Sir Jonathan Paul Ive</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="Type" label-position="top">
                <Select v-model="formData.type" placeholder="please choose the type">
                  <Option value="private">Private</Option>
                  <Option value="public">Public</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="32">
            <Col span="12">
              <FormItem label="Approver" label-position="top">
                <Select v-model="formData.approver" placeholder="please choose the approver">
                  <Option value="jobs">Steven Paul Jobs</Option>
                  <Option value="ive">Sir Jonathan Paul Ive</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="DateTime" label-position="top">
                <DatePicker
                  v-model="formData.date"
                  type="daterange"
                  placeholder="please select the date"
                  style="display: block"
                  placement="bottom-end"
                ></DatePicker>
              </FormItem>
            </Col>
          </Row>
          <FormItem label="Description" label-position="top">
            <Input
              type="textarea"
              v-model="formData.desc"
              :rows="4"
              placeholder="please enter the description"
            />
          </FormItem>
        </Form>
        <div class="demo-drawer-footer">
          <Button style="margin-right: 8px" @click="value3 = false">Cancel</Button>
          <Button type="primary" @click="value3 = false">Submit</Button>
        </div>
      </Drawer>
    </div>

    <div class="page-sub-title">信息预览抽屉</div>
    <p>需要快速预览对象概要时使用，点击遮罩区关闭。</p>
    <div>
      <Button @click="value4 = true" type="primary">View Profile</Button>
      <Drawer :closable="false" width="640" v-model="value4">
        <p :style="pStyle">User Profile</p>
        <p :style="pStyle">Personal</p>
        <div class="demo-drawer-profile">
          <Row>
            <Col span="12">Full Name: Aresn</Col>
            <Col span="12">Account: aresn@aresn.com</Col>
          </Row>
          <Row>
            <Col span="12">City: BeiJing</Col>
            <Col span="12">Country: China</Col>
          </Row>
          <Row>
            <Col span="12">Birthday: May 14, 1991</Col>
            <Col span="12">
              Website:
              <a href="https://dev.iviewui.com" target="_blank">https://dev.iviewui.com</a>
            </Col>
          </Row>Message: Hello, Developer
        </div>
        <Divider />
        <p :style="pStyle">Company</p>
        <div class="demo-drawer-profile">
          <Row>
            <Col span="12">Position: Programmer</Col>
            <Col span="12">Responsibilities:Coding</Col>
          </Row>
          <Row>
            <Col span="12">Department: Map visualization</Col>
          </Row>Skills:C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc.
        </div>
        <Divider />
        <p :style="pStyle">Contacts</p>
        <div class="demo-drawer-profile">
          <Row>
            <Col span="12">Email: admin@aresn.com</Col>
            <Col span="12">Phone Number: +86 18888888888</Col>
          </Row>
          <Row>
            <Col span="12">
              GitHub:
              <a
                href="https://github.com/iview/iview"
                target="_blank"
              >https://github.com/iview/iview</a>
            </Col>
          </Row>
        </div>
      </Drawer>
    </div>

    <div class="page-sub-title">多层抽屉</div>
    <p>在抽屉内打开新的抽屉，用以解决多分支任务的复杂状况</p>
    <Button @click="value5 = true" type="primary">Open Drawer</Button>
    <Drawer title="Multi-level drawer" width="512" :closable="false" v-model="value5">
      <Button @click="value6 = true" type="primary">Two-level Drawer</Button>
    </Drawer>
    <Drawer title="Two-level Drawer" :closable="false" v-model="value6">This is two-level drawer.</Drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: false,
      value2: false,
      value3: false,
      formData: {
        name: "",
        url: "",
        owner: "",
        type: "",
        approver: "",
        date: "",
        desc: ""
      },
      value4: false,
      pStyle: {
        fontSize: "16px",
        color: "rgba(0,0,0,0.85)",
        lineHeight: "24px",
        display: "block",
        marginBottom: "16px"
      },
      value5: false,
      value6: false
    };
  }
};
</script>
<style>
.demo-drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
.demo-drawer-profile {
  font-size: 14px;
}
.demo-drawer-profile .ivu-col {
  margin-bottom: 12px;
}
</style>