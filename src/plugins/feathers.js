export default {
  install: (app, options) => {
    app.mixin({
      created() {
        this.$feathers = options.client;
        //console.log(this);
        //if (!this.$options.feathers) return;
      }
    })
  }
}