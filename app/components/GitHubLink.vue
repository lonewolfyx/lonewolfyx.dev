<template>
    <Button
        as-child
        variant="ghost"
    >
        <NuxtLink
            :to="siteConfig.github"
            rel="noreferrer"
            target="_blank"
        >
            <Icon name="line-md:github-loop" />
        </NuxtLink>
    </Button>
</template>

<script lang="ts" setup>
import { siteConfig } from '~/lib/config'
import { Button } from '~/components/ui/button'
</script>
