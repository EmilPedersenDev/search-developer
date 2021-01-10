<template>
  <div class="row">
    <div class="experience col-12 col-md-8" v-if="items.length > 0">
      <ul class="timeline">
        <li v-for="(item, i) in items" :key="i" :data-date="item.date">
          <slot name="edit-slot" :item="item"></slot>
          <h3>{{ item.company }}</h3>
          <h5>{{ item.title }}</h5>
          <p>{{ item.description }}</p>
          <p class="d-md-none">{{ item.date }}</p>
        </li>
      </ul>
    </div>
    <div class="empty-wrapper" v-else>
      <div class="col-12">
        <img src="work-remote.svg" alt="" />
        <h1>Looks pretty empty</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'experience',
  props: {
    items: {
      type: Array,
      default: () => {
        return [];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors.scss';
$desktop-view: 768px;

.row {
  text-align: center;
  margin-top: 40px;
}

.experience {
  margin: 0 auto;
  max-width: 700px;

  .timeline {
    box-shadow: 0 30px 30px rgba(0, 0, 0, 0.8);
    border-left: 4px solid $primary;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    background: $contrast-background;
    position: relative;
    @media (min-width: 768px) {
      padding: 20px 50px;
    }
    li {
      box-shadow: 0 4px 3px -6px $primary;
      padding-bottom: 50px;
      position: relative;

      &:hover {
        .edit-wrapper {
          opacity: 1 !important;
        }
      }
      h3 {
        letter-spacing: 1.5px;
      }
      p {
        font-weight: 200;
      }
      p,
      h5 {
        margin-top: 5px;
      }

      &:last-of-type {
        box-shadow: none;
      }

      @media (min-width: 768px) {
        &:before,
        &:after {
          position: absolute;
          display: block;
          top: 40%;
        }

        &:before {
          left: (((120px * 0.6) + 50px + 4px + 11px + (4 * 2)) * 1.5) * -1;
          color: fade(#fff, 40%);
          content: attr(data-date);
          text-align: right;
          font-weight: 100;
          font-size: 0.9em;
          min-width: 120px;
        }

        &:after {
          box-shadow: 0 0 0 4px $primary;
          left: (50px + 4px + (11px * 0.35)) * -1;
          background: lighten($contrast-background, 5%);
          border-radius: 50%;
          height: 11px;
          width: 11px;
          content: '';
          top: 43%;
        }
      }
    }
  }
}

.empty-wrapper {
  height: 200px;
  width: 100%;
  text-align: center;
  @media (min-width: 768px) {
    height: 300px;
  }
  .col-12 {
    height: 100%;
    img {
      height: 90%;
    }
    h1 {
      margin-top: 10px;
    }
  }
}
</style>