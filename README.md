## Development Setup

```bash
# install dependencies (ห้ามใช้ npm install)
$ npm ci

# serve with hot reload at localhost:3000 (ต่อ api ที่ localhost:8080)
$ npm run dev

# หากต้องการเรียก api ที่ http://kpi-service.aspiron.co.th
$ npm run dev:asp

# cypress open
$ npm run test:open
$ npm run test:open -- --config ignoreTestFiles="**/examples/*.spec.js"
```

## Production Setup

```bash
# build for production and launch server
$ npm run build
$ npm run start
```

## Development Guideline
- component หลักใช้ [BootstrapVue](https://bootstrap-vue.org/)
- validator หลักใช้ [Vuelidate](https://vuelidate.js.org/)
- icon หลักใช้ [Line Awesome](https://icons8.com/line-awesome) (Replace Font Awesome)
- i18n หลักใช้ [Vue I18n](https://kazupon.github.io/vue-i18n/)
  - ไฟล์ภาษาอยู่ในโฟลเดอร์ static/lang/
  - ไฟล์ lang-xx.js ห้ามสร้างเป็น object และให้ใช้ _ สำหรับแบ่งคำ จัดกลุ่มตาม prefix
  - ไฟล์ common-lang-xx.js ให้แก้ไขเพิ่มใน object c: {...} เท่านั้น (จะได้ไม่ชนกับ lang-xx.js)
- vuex ตั้งชื่อตาม module ที่ทำเช่น user.js, role.js ในโฟลเดอร์ store/
- style sheet หลักใช้ไฟล์ assets/css/main.scss
- พยายามใช้ [justify-content-around](https://getbootstrap.com/docs/4.5/utilities/flex/#justify-content) ในการจัดหน้าจอ หากต้องการช่องว่างเท่า ๆ กัน
- image ให้ลงในโฟลเดอร์ assets/img/
- ถ้าเขียน component สำหรับใช้ในหน้าจอให้ลงในโฟลเดอร์ components/pages/ ตามหน้าจอนั้น ๆ
- [util function](plugins/util.js) สามารถเรียกใช้ได้โดย this.$util.methodName()
- [fetch method](https://nuxtjs.org/api/pages-fetch/) สำหรับโหลดข้อมูลพวก dropdown ที่ข้อมูลไม่เปลี่ยนแปลง (จะมีการทำ caching ที่ method นี้)
- [asyncData method](https://nuxtjs.org/guide/async-data/) สำหรับโหลดข้อมูลที่จะทำงานด้วย เช่น user, user list (โหลดใหม่ทุกครั้งที่เข้าหน้าจอ)
- ทุก page ให้ import CommonMixin ด้วย
  - [toast](https://bootstrap-vue.org/docs/components/toast#toasts) เรียกใช้งานโดย this.toast(variant, msg)
  - [msgBoxConfirm](https://bootstrap-vue.org/docs/components/modal#modal-message-boxes) เรียกใช้งานโดย this.msgBoxConfirm(type or msg)
  - [msgBoxOk](https://bootstrap-vue.org/docs/components/modal#modal-message-boxes) เรียกใช้งานโดย this.msgBoxOk(msg)
  - ถ้ามีการแก้ค่า form แต่ยังไม่ได้กดบันทึก จะ auto popup confirm (ต้องใช้ตัวแปรชื่อ "form" และโหลดข้อมูลใน asyncData() เท่านั้น)
- วิธีตรวจสอบ permission ของ user
  - `<HasPerm any="aaa,bbb,ccc">` เช็คแค่ aaa หรือ bbb หรือ ccc อย่างใดอย่างหนึ่ง
  - `<HasPerm all="aaa,bbb,ccc">` เช็ค aaa และ bbb และ ccc ทั้งหมด



For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
