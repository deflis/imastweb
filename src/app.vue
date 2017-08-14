<template>
    <div id="app">
        <div id="header">
        </div>
        <div id="columns">
            <div class="column nontab">
                <LocalTimeline />
            </div>
            <div class="column nontab">
                <HomeTimeline />
            </div>
            <div class="column tab">
                <b-nav tabs>
                    <!-- ナビゲーションに router-link コンポーネントを使う -->
                    <!-- リンク先を `to` プロパティに指定します -->
                    <!-- デフォルトで `<router-link>` は `<a>` タグとして描画されます -->
                    <router-link to="/login" v-if="!account">Go to Login</router-link>
                    <template v-if="account">
                        <b-nav-item :active="$route.path=='/local'"><router-link to="/local"><icon name="users"></icon>楽屋</router-link></b-nav-item>
                        <b-nav-item :active="$route.path=='/home'"><router-link to="/home"><icon name="home"></icon>オフィス</router-link></b-nav-item>
                    </template>
                </b-nav>
                <!-- ルートアウトレット -->
                <!-- ルートとマッチしたコンポーネントがここへ描画されます -->
                <div class="tab_window">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" src="./app.scss">

</style>

<script lang="ts" src="./app.ts"></script>

