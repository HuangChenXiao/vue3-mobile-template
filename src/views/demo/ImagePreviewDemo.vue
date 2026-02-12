<template>
  <div class="image-preview-demo">
    <h1 class="demo-title">图片预览</h1>
    <p class="demo-desc">点击图片可全屏预览，支持 Swiper 边际滑动切换、双指缩放、双击放大</p>
    <div class="image-grid">
      <div
        v-for="(img, index) in imageList"
        :key="index"
        class="image-item"
        @click="handlePreview(index)"
      >
        <img :src="img" class="image-thumb" alt="预览图" />
      </div>
    </div>
    <ImagePreview
      v-model:visible="visible"
      :images="imageList"
      :start-position="startIndex"
      show-close
      @close="handleClose"
    />
  </div>
</template>

<script setup lang="ts">
import ImagePreview from '@/components/ImagePreview.vue'

// 示例图片列表（375 设计稿 * 2）
const imageList = [
  'https://picsum.photos/750/1000?random=1',
  'https://picsum.photos/750/1000?random=2',
  'https://picsum.photos/750/1000?random=3'
]

const visible = ref(false)
const startIndex = ref(0)

function handlePreview(index: number) {
  startIndex.value = index
  visible.value = true
}

function handleClose() {
  visible.value = false
}
</script>

<style lang="stylus" scoped>
.image-preview-demo
  min-height 100vh
  padding 40px 24px
  box-sizing border-box

.demo-title
  font-size 48px
  font-weight 700
  color #333
  margin 0 0 16px

.demo-desc
  font-size 26px
  color #666
  margin 0 0 32px

.image-grid
  display grid
  grid-template-columns repeat(3, 1fr)
  gap 16px

.image-item
  aspect-ratio 1
  border-radius 12px
  overflow hidden
  cursor pointer

.image-thumb
  width 100%
  height 100%
  object-fit cover
</style>

