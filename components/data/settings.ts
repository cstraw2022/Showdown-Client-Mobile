interface ISettingsData = {
  title: string;
  icon: JSX.Element;
  data: SettingsType[];
};

type SettingsType = 'aboutMe' | 'spaceAPI' | 'help' | 'theme';

const settingsData: ISettingsData[] = [
  {
    title: 'About',
    icon: (
      <GiftIcon scale={0.8} />
    ),
    data: ['aboutMe', 'spaceAPI', 'theme'],
  },
  {
    title: 'Feedback and Help',
    icon: (
      <MailIcon scale={0.8} />
    ),
    data: ['help'],
  },
];