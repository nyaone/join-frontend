import { BoltIcon, GlobeAltIcon, ScaleIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: '去中心化社交',
    description:
      '无论您的朋友在 Fediverse 的哪个角落，使用的是 Misskey 、 Pleroma 或是 Mastodon ，您都可以轻松关注、互动，共享美好社交生活，',
    icon: GlobeAltIcon,
  },
  {
    name: '无广告，无会员',
    description:
      '受够了恼人的广告？见到会员专享的服务就头疼？只想享受属于自己的清净时间线？这里就是您梦想中的乐土。我们坚持用爱发电，不投放广告，不设置会员制度。',
    icon: ScaleIcon,
  },
  {
    name: '开放源代码',
    description:
      '喵窝是一款基于 Misskey 平台进行针对性修改的社交平台实例，您可以在 NyaCodes 或是 GitHub 访问到我们所有的源代码。',
    icon: BoltIcon,
  },
];

const Feature1 = () => (
  <div className="bg-white py-20 sm:py-24 lg:py-24">
    <div className="mx-auto max-w-xl px-6 lg:max-w-7xl lg:px-8">
      <dl className="grid grid-cols-1 gap-16 lg:grid lg:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.name}>
            <dt>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
                <feature.icon className="h-8 w-8" aria-hidden="true" />
              </div>
              <p className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{feature.name}</p>
            </dt>
            <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
          </div>
        ))}
      </dl>
    </div>
  </div>
);

export default Feature1;
