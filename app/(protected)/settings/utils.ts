import {
  BellSolidIcon, UserCircleIcon, CubeIcon, CreditCardIcon, QuestionMarkCircleIcon,
} from "@/common/components/icons";
import lang from "@/common/lang";
const { settingsNavigation: {
  general, plan, support, billing, notifications,
} } = lang;
import { routes } from "@/common/routes";

export const navigationElements = [
  {
    id: 'general',
    name: general,
    href: routes.generalSettingsPath,
    icon: UserCircleIcon,
    'data-cy': 'general',
  },
  {
    id: 'notifications',
    name: notifications,
    href: routes.notificationsSettingsPath,
    icon: BellSolidIcon,
    'data-cy': 'notifications',
  },
  {
    id: 'plan',
    name: plan,
    href: routes.planSettingsPath,
    icon: CubeIcon,
    'data-cy': 'plan',
  },
  {
    id: 'billing',
    name: billing,
    href: routes.billingSettingsPath,
    icon: CreditCardIcon,
    'data-cy': 'billing',
  },
  {
    id: 'support',
    name: support,
    href: routes.supportSettingsPath,
    icon: QuestionMarkCircleIcon,
    'data-cy': 'support',
  },
]
