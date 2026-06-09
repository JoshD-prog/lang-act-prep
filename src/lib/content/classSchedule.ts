type ScheduleSource = {
  slug?: string | null;
  schedule?: string | null;
};

type ScheduleOverride = {
  timeLabel: string;
  cadenceLabel?: string;
};

const scheduleOverrides: Record<string, ScheduleOverride> = {
  'act-cram-june-2026': {
    timeLabel: '6:30-8:00 PM',
    cadenceLabel: 'Mon-Thu, same time each day'
  },
  'act-cram-july-2026': {
    timeLabel: '6:30-8:00 PM',
    cadenceLabel: 'Mon-Thu, same time each day'
  },
  'act-cram-september-2026': {
    timeLabel: '6:30-8:00 PM',
    cadenceLabel: 'Mon-Thu, same time each day'
  },
  'act-cram-october-2026': {
    timeLabel: '6:30-8:00 PM',
    cadenceLabel: 'Mon-Thu, same time each day'
  }
};

const timeRangePattern =
  /(\d{1,2}(?::\d{2})?\s*(?:AM|PM)?)\s*[–-]\s*(\d{1,2}(?::\d{2})?\s*(?:AM|PM))/i;

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

export function getClassScheduleDetails(source: ScheduleSource) {
  const schedule = normalizeWhitespace(source.schedule ?? '');
  const override = source.slug ? scheduleOverrides[source.slug] : undefined;

  if (!schedule) {
    return {
      dateLabel: '',
      timeLabel: override?.timeLabel ?? '',
      cadenceLabel: override?.cadenceLabel ?? '',
      optionLabel: '',
      hasTime: Boolean(override?.timeLabel)
    };
  }

  const timeMatch = schedule.match(timeRangePattern);
  const dateLabel = normalizeWhitespace(
    timeMatch ? schedule.slice(0, timeMatch.index).replace(/[,\s]+$/, '') : schedule
  );
  const timeLabel = normalizeWhitespace(timeMatch?.[0] ?? override?.timeLabel ?? '');
  const cadenceLabel = override?.cadenceLabel ?? '';

  return {
    dateLabel,
    timeLabel,
    cadenceLabel,
    optionLabel: timeLabel ? `${dateLabel} • ${timeLabel}` : dateLabel,
    hasTime: Boolean(timeLabel)
  };
}
