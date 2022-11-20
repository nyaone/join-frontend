import { CheckIcon } from '@heroicons/react/24/outline';

const features = [
  { name: '邀请伙伴', description: '注册满 24 小时后，您就可以不限时不限量地邀请新的朋友们了，让社区变得活跃起来吧！' },
  {
    name: '自由开发',
    description: '有什么新的想法，有什么发现的问题，随时开 PR 就好。或者想基于我们的代码进一步修改？快去 Fork 吧。',
  },
  { name: '友善社区', description: '礼貌地对待大家，大家也都会温柔以待。至于对待出言不逊的家伙，直接拉黑就行。' },
  { name: '自定义表情', description: '我们会不时追加新的表情包，用可爱的表情表达此刻的心情吧！' },
  {
    name: '跨设备支持',
    description: '有种神奇的东西叫网页客户端，它只要有浏览器，就能随时随地跨设备兼容，无需安装 APP 。',
  },
  {
    name: '足够的性能',
    description:
      '喵窝的服务器应该能支撑足够多的用户量容载，只要遵守合理使用规约，您可以放心大胆地注册。性能不足够？新机器马上安排。',
  },
  {
    name: '平等的身份',
    description: '没有人比别人更平等，哪怕是 bot 也是如此。这里没有腐朽的封建等级制，只有大家都喜欢的社区。',
  },
  {
    name: '更多精彩',
    description: '浏览到这里你应该也已经猜到我暂时想不出来更多的什么优点了，所以快去用自己的双眼发现触手可及的没好吧！',
  },
];

const Feature2 = () => (
  <div className="bg-white">
    <div className="mx-auto max-w-7xl py-24 px-6 sm:py-32 lg:grid lg:grid-cols-3 lg:gap-x-12 lg:px-8 lg:py-16">
      <div>
        <h2 className="text-lg font-semibold leading-8 tracking-tight text-primary">您梦想中的社区</h2>
        <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900">尽在于此</p>
        <p className="mt-6 text-base leading-7 text-gray-600">
          源代码开放，开发者友好，改进邀请系统，不断追加新特性……管理团队日常定居于此，要是自己用着不舒服又怎么能指望让别人满意？
        </p>
      </div>
      <div className="mt-20 lg:col-span-2 lg:mt-0">
        <dl className="grid grid-cols-1 gap-12 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-4">
          {features.map((feature) => (
            <div key={feature.name} className="relative">
              <dt>
                <CheckIcon className="absolute mt-1 h-6 w-6 text-primary" aria-hidden="true" />
                <p className="ml-10 text-lg font-semibold leading-8 text-gray-900">{feature.name}</p>
              </dt>
              <dd className="mt-2 ml-10 text-base leading-7 text-gray-600">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  </div>
);

export default Feature2;
