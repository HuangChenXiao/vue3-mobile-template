<template>
  <Teleport to="body">
    <Transition name="fade" appear>
      <div
        v-if="visible"
        class="image-preview"
        :style="{ zIndex: zIndex }"
        @touchmove.prevent
        @click="handleMaskClick"
      >
        <!-- 关闭按钮 -->
        <div v-if="showClose" class="image-preview__close" @click="handleClose"></div>

        <!-- 图片容器：使用 Swiper 实现边际滑动切换 -->
        <div class="image-preview__container">
          <Swiper
            v-if="images.length > 0"
            :modules="swiperModules"
            :initial-slide="startPosition"
            :slides-per-view="1"
            :space-between="0"
            :loop="images.length > 1"
            :resistance="true"
            :resistance-ratio="0.6"
            :speed="300"
            :zoom="zoomOptions"
            class="image-preview__swiper"
            @swiper="onSwiper"
            @slide-change="onSlideChange"
          >
            <SwiperSlide v-for="(image, index) in images" :key="index" :zoom="true">
              <img
                :src="image"
                class="image-preview__image"
                draggable="false"
                @load="handleImageLoad"
                @error="handleImageError"
              />
            </SwiperSlide>
          </Swiper>
        </div>

        <!-- 指示器 -->
        <div v-if="images.length > 1" class="image-preview__indicator">
          {{ currentIndex + 1 }} / {{ images.length }}
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Zoom } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/zoom'

interface Props {
  visible?: boolean
  images?: string[]
  startPosition?: number
  zIndex?: number
  minZoom?: number
  maxZoom?: number
  showClose?: boolean
  closeOnClickMask?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  images: () => [],
  startPosition: 0,
  zIndex: 2000,
  minZoom: 1,
  maxZoom: 3,
  showClose: false,
  closeOnClickMask: true
})

const emit = defineEmits<{
  (e: 'update:visible', visible: boolean): void
  (e: 'close'): void
  (e: 'change', index: number): void
}>()

const swiperModules = [Zoom]

const currentIndex = ref(props.startPosition)

// Swiper Zoom 配置
const zoomOptions = computed(() => ({
  enabled: true,
  maxRatio: props.maxZoom,
  minRatio: props.minZoom,
  toggle: true
}))

// 监听 visible 变化
watch(
  () => props.visible,
  (val) => {
    if (val) {
      currentIndex.value = props.startPosition
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  document.body.classList.remove('no-scroll')
})

const onSwiper = (swiper: {
  realIndex: number
  slideToLoop: (index: number) => void
  slideTo: (index: number) => void
}) => {
  currentIndex.value = swiper.realIndex
  const targetIndex = props.startPosition
  if (targetIndex !== swiper.realIndex) {
    swiper.slideToLoop?.(targetIndex) ?? swiper.slideTo(targetIndex)
  }
}

const onSlideChange = (swiper: { realIndex: number; activeIndex: number }) => {
  currentIndex.value = swiper.realIndex
  emit('change', swiper.realIndex)
}

const handleImageLoad = () => {}
const handleImageError = () => {
  console.error('图片加载失败')
}

const handleClose = () => {
  emit('update:visible', false)
  emit('close')
}

const handleMaskClick = (e: MouseEvent) => {
  if (!props.closeOnClickMask) return
  // 点击图片本身不关闭（避免与双击缩放冲突）
  if ((e.target as HTMLElement).tagName === 'IMG') return
  handleClose()
}
</script>

<style lang="stylus" scoped>
.image-preview
  position fixed
  left 0
  right 0
  top 0
  bottom 0
  background-color rgba(0, 0, 0, 0.8)
  display flex
  align-items center
  justify-content center
  z-index 2000
  touch-action none
  user-select none

  &__close
    position absolute
    top 20px
    right 20px
    width 44px
    height 44px
    display flex
    align-items center
    justify-content center
    z-index 2001
    cursor pointer
    color #fff
    font-size 24px

  &__container
    width 100%
    height 100%
    display flex
    align-items center
    justify-content center
    overflow hidden
    touch-action none

  &__swiper
    width 100%
    height 100%

  :deep(.swiper-slide)
    display flex
    align-items center
    justify-content center

  :deep(.swiper-zoom-container)
    display flex
    align-items center
    justify-content center
    width 100%
    height 100%

  &__image
    max-width 100vw
    max-height 100vh
    object-fit contain
    user-select none
    pointer-events auto
    display block
    touch-action none

  &__indicator
    position absolute
    bottom 30px
    left 50%
    transform translateX(-50%)
    padding 6px 16px
    background-color rgba(0, 0, 0, 0.5)
    border-radius 20px
    color #fff
    font-size 14px
    z-index 2001

  &__close
    width 44px
    height 44px
    display flex
    align-items center
    justify-content center
    z-index 2001
    cursor pointer
    background url('@/assets/images/prompt-close.png') no-repeat center center
    background-size 100%
</style>
