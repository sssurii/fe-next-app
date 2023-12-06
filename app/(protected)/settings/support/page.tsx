'use client';
import { SettingsHeader } from "@/common/components/molecules/headers";
import lang from "@/common/lang";

const { support } = lang;

const Support = () => {
  return (
    <SettingsHeader headerText={support.header} descriptionText={support.description} />
  )
}

export default Support;
