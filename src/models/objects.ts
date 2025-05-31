/* eslint-disable  @typescript-eslint/no-explicit-any */

export interface Root {
  id: number
  created_at: string
  updated_at: string
  status_changed_at?: any
  status_children_changed_at: string
  name: Translation
  beschreibung: Translation
  strasse?: any
  plz?: any
  stadt?: any
  land?: any
  mail?: any
  telefon?: any
  url_web?: any
  poly: Poly
  point: Point
  pictures?: any[]
  total_count_assigned: number
  assigned_objects: AssignedObject[]
}

export interface Poly {
  type: string
  coordinates: number[][][]
}

export interface Point {
  type: string
  coordinates: number[]
}

export interface AssignedObject {
  id: number
  created_at: string
  updated_at: string
  status_changed_at?: any
  status_children_changed_at: string
  name: Translation
  beschreibung: Translation
  typ: number
  strasse?: any
  plz?: any
  stadt?: any
  land?: any
  mail?: any
  telefon?: any
  schneetelefon?: any
  saison_start?: any
  saison_ende?: any
  pos_anfahrt?: PosAnfahrt
  poly?: Poly
  point?: Point
  hp?: number
  tp?: number
  hoehe_diff?: number
  url_web?: any
  url_preis?: any
  datenquelle?: string
  wc: boolean
  wlan: boolean
  skiverleih: boolean
  skiservice: boolean
  skischule: boolean
  rodelverleih: boolean
  parkplatz_kostenpflichtig: boolean
  parkplatz_kostenfrei: boolean
  wc_text?: any
  wlan_text?: any
  skiverleih_text?: any
  skiservice_text?: any
  skischule_text?: any
  rodelverleih_text?: any
  parkplatz_kostenpflichtig_text?: any
  parkplatz_kostenfrei_text?: any
  webcams?: any
  von?: any
  bis?: any
  pictures: Picture[]
  opening_hours?: any[]
  mapping_type: string
  mapping_type_id: number
  total_count_assigned: number
  assigned_objects: AssignedObject2[]
}

export interface PosAnfahrt {
  type: string
  coordinates: number[]
}

export interface Picture {
  id: number
  updated_at: string
  url: string
  file_name: string
  title: Translation
  description: Translation
  alt_text: Translation
  coordinate?: any
  license: number
  creator: string
  main: boolean
  order: number
}

export interface AssignedObject2 {
  id: number
  sid?: number
  created_at: string
  updated_at: string
  status_changed_at: string
  name: Translation
  beschreibung: Translation
  dauer?: string
  laenge?: string
  schwierigkeit?: number
  geometry?: Geometry
  tiefpunkt?: string
  hochpunkt?: string
  startort?: string
  startort_detail?: string
  tags?: string[]
  sportart_specific?: SportartSpecific
  status?: number
  situation?: any
  status_info?: any
  km_open?: any
  loipen_status?: LoipenStatus
  mapping_type: string
  mapping_type_id: number
  pictures?: any[]
  typ?: number
  line?: any
  poly?: Poly3
  point?: any
  opening_hours?: any[]
}

export interface Translation {
  de?: string
  en?: string
  it?: string
  fr?: string
  hu?: string
  cz?: string
  nl?: string
}

export interface Geometry {
  type: string
  coordinates: number[][]
}

export interface SportartSpecific {
  anlagen_art: number
  loipen_art: number
  kunstschnee: boolean
  beleuchtet: boolean
  kostenfrei: boolean
  umziehmoeglichkeit: boolean
  schwierigkeit: number
  rundweg: boolean
}

export interface LoipenStatus {
  status: number
  shh: number
  sht: number
  bzustand: number
  bzustanddatum?: any
  szustand: number
  bzustandinfo?: string
  infotext?: string
  lbedingungen?: any[]
  geschlossen_typ: number
  sperr_typ: number
  prep_km_klassisch: string
  prep_km_skating: string
  status_klassisch: number
  status_skating: number
}

export interface Poly3 {
  type: string
  coordinates: number[][][][]
}

export interface TrailDisplay {
  id: string
  name: string
  status: string
  condition: string
  difficultyLevel: number // 1-3
  length: number
  lastPreparation: Date
  notes?: string
  activities: string[]
  allowsDogs?: boolean
  isBidirectional?: boolean
}

export interface SnowCondition {
  snowHeight: number
  snowType: string
}

export interface TrailSystemInfo {
  regions: string[]
  openTrails: number
  totalTrails: number
  kilometers: number
  easyKilometers: number
  mediumKilometers: number
  difficultKilometers: number
  openingHours: string
  snowCondition: SnowCondition
}
