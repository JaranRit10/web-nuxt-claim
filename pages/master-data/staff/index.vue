<template>
  <div>
    <div class="page__header">
      <div class="page__title">
        <h1>{{ $t('staff') }}</h1> <span>{{ $t('c.list') }}</span>
      </div>
      <div class="page__breadcrumb">
        <i class="las la-md la-home" /> {{ $t('c.home') }} / {{ $t('master_data') }} / {{ $t('staff') }}
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="title">
          <i class="las la-angle-up" @click="toggleCollapse('search-criteria', $event)" style="cursor: pointer;"></i> {{ $t('c.filter') }}
        </div>
        <div class="action">
          <button class="btn btn-primary">
            <i class="las la-search"></i> <span>{{ $t('c.search') }}</span>
          </button>
          <button class="btn btn-warning ml-2">
            <i class="las la-undo-alt"></i> <span>{{ $t('c.clear') }}</span>
          </button>
        </div>
      </div>

      <b-collapse visible id="search-criteria">
        <div class="card-body">
          <b-row aligh-h="around">
            <b-col></b-col>
          </b-row>
        </div>
      </b-collapse>
    </div>
  </div>
</template>
<script>
import CommonMixin from '~/assets/js/CommonMixin'
export default {
  name: 'EmployeeList',
  mixins: [CommonMixin],
}
</script>
