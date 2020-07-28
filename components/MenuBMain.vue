<template>
  <div>
    <!-- <field-filter />
    <skill-filter /> -->
    <!-- <div v-for="typeFilter in typeFilters" :key="typeFilter">
      <base-filter :id="typeFilter" :type="typeFilter" />
    </div> -->
    <base-filter :type="'fields'" />
    <base-filter :type="'skills'" />
    <base-filter :type="'tools'" :display="'icon'" />
    <base-filter :type="'institutes'" :display="'logo'" />
    <years-filter />
  </div>
</template>

<script>
import BaseFilter from '~/components/ProjectFilters/BaseFilter.vue'
// import FieldFilter from '~/components/ProjectFilters/FilterFields.vue'
// import SkillFilter from '~/components/ProjectFilters/FilterSkills.vue'
import YearsFilter from '~/components/ProjectFilters/FilterYears.vue'

export default {
  components: {
    BaseFilter,
    // FieldFilter,
    // SkillFilter,
    YearsFilter,
  },
  data() {
    return {
      typeFilters: ['fields', 'skills', 'tools', 'institutes'],
    }
  },
}
</script>
